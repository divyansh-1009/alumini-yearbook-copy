'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import AboutContent from "@/components/about-content";
import FeedContent from "@/components/feed-content";
import UpdateContent from "@/components/update-content";
import ImageUploader from "@/components/image-uploader";
import MessageBatchmates from "@/components/message-batchmates";
import MessageJunior from "@/components/message-junior";
import ContactForm from "@/components/contact-form"; 
import { TeamSection } from "@/components/team-section";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeContent, setActiveContent] = useState<string>("about");
  const [sectionUrl, setSectionUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/error");
    }
  }, [status, router]);

  const handleNavChange = (content: string, url?: string) => {
    setActiveContent(content);
    if (url) {
      setSectionUrl(url);
    } else {
      setSectionUrl(null);
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case "add":
        return <ImageUploader />;
      case "message_batchmate":
        return <MessageBatchmates />;
      case "message_junior":
        return <MessageJunior />;
      case "contact_us":
        return <ContactForm />;
      case "update":
        return <UpdateContent />;
      case "team":
        return <TeamSection />;
      case "feed":
        return <FeedContent />;
      case "about":
        return <AboutContent />;
      default:
        return <AboutContent />;
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar onNavChange={handleNavChange} activeContent={activeContent}>
        <div></div>
      </AppSidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
        </header>
        <div className="flex-1 overflow-auto content-container" style={{ 
          height: 'calc(100vh - 4rem)', 
          position: 'relative',
          WebkitOverflowScrolling: 'touch'
        }}>
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
