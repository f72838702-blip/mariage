import Hero from "@/components/Hero";
import Program from "@/components/Program";
import Locations from "@/components/Locations";
import DressCode from "@/components/DressCode";
import Accommodation from "@/components/Accommodation";
import RsvpForm from "@/components/RsvpForm";
import GiftRegistry from "@/components/GiftRegistry";
import Memories from "@/components/Memories";

export default function Home() {
  return (
    <>
      <Hero />
      <Program />
      <Locations />
      <DressCode />
      <Accommodation />
      <RsvpForm />
      <GiftRegistry />
      <Memories />
    </>
  );
}
