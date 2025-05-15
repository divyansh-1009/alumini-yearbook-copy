import Image from "next/image";

interface TeamMemberProps {
  name: string;
  photoUrl: string;
}

const TeamMember = ({ name, photoUrl }: TeamMemberProps) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    <div className="relative w-48 h-48 mb-6">
      <div className="absolute inset-0 rounded-full bg-gray-200" />
      <Image
        src={photoUrl}
        alt={name}
        fill
        className="rounded-full object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <h3 className="text-xl font-semibold text-blue-900">{name}</h3>
  </div>
);

export function TeamSection() {
  const developers = [
    { name: "Akhil Dhyani", photoUrl: "/placeholder.jpg" },
    { name: "Divyansh Yadav", photoUrl: "/Divyansh_yadav.jpg" },
    { name: "Developer 3", photoUrl: "/placeholder.jpg" },
    { name: "Developer 4", photoUrl: "/placeholder.jpg" },
    { name: "Developer 5", photoUrl: "/placeholder.jpg" },
  ];

  const designers = [{ name: "Sumedha Singh", photoUrl: "/placeholder.jpg" }];

  return (
      <div className="max-w-6xl mx-auto p-6 space-y-8  rounded-lg">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">
          Meet The Team
        </h1>

        {/* Developers Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-800 border-b border-blue-200 pb-2">
            Developers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {developers.map((dev, index) => (
              <TeamMember key={index} name={dev.name} photoUrl={dev.photoUrl} />
            ))}
          </div>
        </div>

        {/* Designers Section */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold text-blue-800 border-b border-blue-200 pb-2">
            Designers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {designers.map((designer, index) => (
              <TeamMember key={index} name={designer.name} photoUrl={designer.photoUrl} />
            ))}
          </div>
        </div>
      </div>

  );
}