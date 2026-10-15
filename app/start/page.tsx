import { redirect } from "next/navigation"

/** A landing clara virou a home. /start fica como redirecionamento
 *  para não quebrar link que já tenha saído em anúncio. */
export default function Start() {
  redirect("/")
}
