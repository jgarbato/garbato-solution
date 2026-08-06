CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"asaas_customer_id" text NOT NULL,
	"nome" text NOT NULL,
	"cpf_cnpj" text NOT NULL,
	"email" text NOT NULL,
	"telefone" text,
	"tipo_pessoa" text NOT NULL,
	"endereco" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customers_asaas_customer_id_unique" UNIQUE("asaas_customer_id")
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"asaas_payment_id" text NOT NULL,
	"subscription_id" integer NOT NULL,
	"value_cents" integer NOT NULL,
	"status" text NOT NULL,
	"billing_type" text NOT NULL,
	"due_date" timestamp NOT NULL,
	"paid_at" timestamp,
	"invoice_url" text,
	"bank_slip_url" text,
	"pix_qr_code_image" text,
	"pix_payload" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payments_asaas_payment_id_unique" UNIQUE("asaas_payment_id")
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"asaas_subscription_id" text NOT NULL,
	"customer_id" integer NOT NULL,
	"sistema" text NOT NULL,
	"plano" text NOT NULL,
	"periodo" text NOT NULL,
	"billing_type" text NOT NULL,
	"value_cents" integer NOT NULL,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"access_granted" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscriptions_asaas_subscription_id_unique" UNIQUE("asaas_subscription_id")
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_customers_email" ON "customers" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_customers_cpf_cnpj" ON "customers" USING btree ("cpf_cnpj");--> statement-breakpoint
CREATE INDEX "idx_payments_subscription" ON "payments" USING btree ("subscription_id");--> statement-breakpoint
CREATE INDEX "idx_payments_status" ON "payments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_subscriptions_customer" ON "subscriptions" USING btree ("customer_id");