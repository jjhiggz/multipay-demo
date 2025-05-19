import { auth } from "./lib/auth";

async function main() {
  const result = await auth.api.signInEmail({
    body: {
      email: "jon@jon.com",
      password: "password123",
    },
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
