export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-yellow-200 via-customBlue-600 to-yellow-200 py-6 text-center shadow-xl">
      <p className="text-lg text-white opacity-80">
        © {new Date().getFullYear()} PIKA PIKA STORE. All rights reserved.
      </p>
    </footer>
  );
}
