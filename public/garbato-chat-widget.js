/* Garbato Chat Widget — bolha de chat flutuante para Lara (clínica) e Sofia (imobiliário).
 * Uso:
 *   <script src="/garbato-chat-widget.js" data-agent="lara"></script>
 *   <script src="/garbato-chat-widget.js" data-agent="sofia"></script>
 * Opcional: data-webhook="https://..." sobrescreve o endpoint.
 * Não depende de framework. Funciona em qualquer página (Next, HTML puro, etc.).
 */
(function () {
  var script = document.currentScript || document.querySelector('script[src*="garbato-chat-widget"]');
  var agent = (script && script.getAttribute('data-agent')) || 'lara';

  var CFG = {
    lara: {
      name: 'Lara',
      tag: 'Assistente de IA · Garbato',
      color: '#25d366', colorDark: '#128c7e',
      webhook: 'https://n8n.garbatosolution.com.br/webhook/lara-chat',
      greeting: 'Oi! 👋 Sou a Lara, IA da Garbato. Me conta: que tipo de clínica você tem e qual sua maior dor hoje? (lead que some no WhatsApp, agenda, faltas...)'
    },
    sofia: {
      name: 'Sofia',
      tag: 'Assistente de IA · Garbato',
      color: '#2d8cf0', colorDark: '#0a5dc2',
      webhook: 'https://n8n.garbatosolution.com.br/webhook/imob-chat',
      greeting: 'Oi! 👋 Sou a Sofia, IA da Garbato. A gente automatiza a gestão de loteamentos e imóveis — reajuste de parcela pelo IGPM, carnê integrado ao banco, distrato, conciliação. Você trabalha com loteamento, locação ou os dois?'
    }
  };
  var c = CFG[agent] || CFG.lara;
  var webhook = (script && script.getAttribute('data-webhook')) || c.webhook;

  var history = [], busy = false, opened = false, greeted = false;
  var sessionId;
  try {
    sessionId = sessionStorage.getItem('gcw_sid_' + agent);
    if (!sessionId) { sessionId = 'web-' + agent + '-' + Date.now() + '-' + Math.floor(Math.random() * 1e6); sessionStorage.setItem('gcw_sid_' + agent, sessionId); }
  } catch (e) { sessionId = 'web-' + agent + '-' + Date.now(); }

  // ---- estilos ----
  var css = '' +
    '.gcw-btn{position:fixed;right:20px;bottom:20px;width:60px;height:60px;border-radius:50%;background:' + c.color + ';box-shadow:0 6px 20px rgba(0,0,0,.25);border:none;cursor:pointer;z-index:99998;display:flex;align-items:center;justify-content:center;transition:transform .15s}' +
    '.gcw-btn:hover{transform:scale(1.06)}' +
    '.gcw-btn svg{width:30px;height:30px;fill:#fff}' +
    '.gcw-panel{position:fixed;right:20px;bottom:90px;width:370px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 120px);background:#fff;border-radius:16px;box-shadow:0 16px 50px rgba(0,0,0,.3);z-index:99999;display:none;flex-direction:column;overflow:hidden;font-family:-apple-system,"Segoe UI",Roboto,sans-serif}' +
    '.gcw-panel.gcw-open{display:flex}' +
    '.gcw-head{background:' + c.colorDark + ';color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px}' +
    '.gcw-av{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:17px}' +
    '.gcw-hn{font-weight:600;font-size:15px;line-height:1.1}.gcw-ht{font-size:11px;opacity:.85}' +
    '.gcw-x{margin-left:auto;background:none;border:none;color:#fff;font-size:20px;cursor:pointer;opacity:.8}' +
    '.gcw-msgs{flex:1;overflow-y:auto;padding:14px;background:#f4f6f8;display:flex;flex-direction:column;gap:8px}' +
    '.gcw-b{max-width:82%;padding:9px 12px;border-radius:12px;font-size:14px;line-height:1.4;white-space:pre-wrap;word-wrap:break-word}' +
    '.gcw-bot{align-self:flex-start;background:#fff;color:#1a2530;border:1px solid #e6e9ed;border-top-left-radius:3px}' +
    '.gcw-me{align-self:flex-end;background:' + c.color + ';color:#fff;border-top-right-radius:3px}' +
    '.gcw-typ{align-self:flex-start;color:#8a97a5;font-size:13px;padding:6px 10px}' +
    '.gcw-in{display:flex;gap:8px;padding:10px;border-top:1px solid #e6e9ed;background:#fff}' +
    '.gcw-in input{flex:1;border:1px solid #d6dbe0;border-radius:20px;padding:10px 14px;font-size:14px;outline:none}' +
    '.gcw-in button{background:' + c.color + ';border:none;border-radius:50%;width:40px;height:40px;color:#fff;font-size:17px;cursor:pointer}' +
    '.gcw-in button:disabled{opacity:.5}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ---- DOM ----
  var btn = document.createElement('button');
  btn.className = 'gcw-btn'; btn.setAttribute('aria-label', 'Falar com ' + c.name);
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.4 1.2 4.5 3.1 6-.2 1.2-.8 2.6-1.6 3.5 1.6-.2 3.4-.8 4.7-1.7 1.2.4 2.5.7 3.8.7 5.5 0 10-3.8 10-8.5S17.5 3 12 3z"/></svg>';
  var panel = document.createElement('div');
  panel.className = 'gcw-panel';
  panel.innerHTML =
    '<div class="gcw-head"><div class="gcw-av">' + c.name.charAt(0) + '</div>' +
    '<div><div class="gcw-hn">' + c.name + '</div><div class="gcw-ht">' + c.tag + '</div></div>' +
    '<button class="gcw-x" aria-label="Fechar">&times;</button></div>' +
    '<div class="gcw-msgs" id="gcw-msgs"></div>' +
    '<div class="gcw-in"><input id="gcw-inp" placeholder="Escreva sua mensagem..." autocomplete="off"><button id="gcw-send">&#10148;</button></div>';
  document.body.appendChild(btn); document.body.appendChild(panel);

  var msgsEl = panel.querySelector('#gcw-msgs');
  var inp = panel.querySelector('#gcw-inp');
  var sendBtn = panel.querySelector('#gcw-send');

  function bubble(text, who) { var d = document.createElement('div'); d.className = 'gcw-b ' + (who === 'me' ? 'gcw-me' : 'gcw-bot'); d.textContent = text; msgsEl.appendChild(d); msgsEl.scrollTop = msgsEl.scrollHeight; return d; }
  function typing() { var d = document.createElement('div'); d.className = 'gcw-typ'; d.textContent = c.name + ' está digitando…'; msgsEl.appendChild(d); msgsEl.scrollTop = msgsEl.scrollHeight; return d; }

  function toggle() {
    opened = !opened;
    panel.classList.toggle('gcw-open', opened);
    if (opened && !greeted) { greeted = true; bubble(c.greeting, 'bot'); }
    if (opened) inp.focus();
  }
  btn.addEventListener('click', toggle);
  panel.querySelector('.gcw-x').addEventListener('click', toggle);

  async function send() {
    if (busy) return;
    var text = inp.value.trim(); if (!text) return;
    busy = true; inp.value = ''; sendBtn.disabled = true;
    bubble(text, 'me'); history.push({ role: 'user', content: text });
    var t = typing();
    try {
      var r = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, history: history.slice(0, -1), sessionId: sessionId }) });
      var data = await r.json(); t.remove();
      var reply = data.reply || '(sem resposta)';
      bubble(reply, 'bot'); history.push({ role: 'assistant', content: reply });
    } catch (e) { t.remove(); bubble('Ops, tive um problema agora. Tenta de novo em instantes? 🙂', 'bot'); }
    busy = false; sendBtn.disabled = false; inp.focus();
  }
  sendBtn.addEventListener('click', send);
  inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(); });
})();
