export default function Footer() {
  return (
    <footer className="bg-gradient-to-r bg-customBlue-600 py-6 text-center shadow-xl">
      <p className="text-lg text-white opacity-80">
        © {new Date().getFullYear()} PIKA PIKA STORE. All rights reserved.
      </p>
    </footer>
  );
}
