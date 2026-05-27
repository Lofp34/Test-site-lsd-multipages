import Image from 'next/image';

interface AuthorCardProps {
  className?: string;
}

export default function AuthorCard({ className = '' }: AuthorCardProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-mint-green/20 shrink-0">
        <Image
          src="/laurent.jpg"
          alt="Laurent Serre"
          fill
          className="object-cover"
          sizes="48px"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-blue-ink leading-tight">
          Laurent Serre
        </span>
        <span className="text-xs text-gray-500 leading-tight">
          Consultant commercial : 15 ans de terrain PME
        </span>
      </div>
    </div>
  );
}
