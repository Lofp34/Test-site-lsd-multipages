import Image from 'next/image';
import Link from 'next/link';

export default function AuthorCard() {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Image
            src="/images/laurent-serre.jpg"
            alt="Laurent Serre"
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-900">Laurent Serre</p>
          <p className="text-sm text-gray-600 mt-1">
            Dirigeant, formateur et stratège commercial. J&apos;aide les PME B2B à
            transformer des pratiques commerciales encore instinctives en systèmes
            de vente clairs, transmissibles et pilotables.
          </p>
          <p className="mt-2">
            <Link
              href="/"
              className="text-sm text-[#FF6B35] hover:text-[#e55a2b] font-medium"
            >
              → En savoir plus sur mon accompagnement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
