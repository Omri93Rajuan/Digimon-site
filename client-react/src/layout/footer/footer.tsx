export default function Footer() {
  return (
    <footer className="bg-customGold text-black py-5 text-center">
      <p className="text-lg font-medium">
        כל הזכויות שמורות לדיג'ימון ישראל &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
