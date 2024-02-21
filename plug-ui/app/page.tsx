'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import NextLink from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faXTwitter, faYoutube, faFacebook, faWhatsapp, faDiscord } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'


export default function Home() {
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (<div className="w-3/4 mx-auto grid grid-cols-12 grid-rows-4 gap-2">
    <Card className="col-start-2 col-span-6 h-[600px] row-span-4 shadow-xl" isBlurred isFooterBlurred={false}>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="/images/plug_app_hero.png"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">

          <div className="flex flex-col">
            <p className="text-small text-white/60">Chcesz wiedzieć więcej?</p>
            <p className="text-small text-white/60">Odwiedź naszą stronę internetową</p>
          </div>
        </div>
        <Button radius="full" size="sm" as="a" href="https://plug.org.pl/" target="_blank">Idź do www</Button>
      </CardFooter>
    </Card>
    <div className="col-start-8 col-span-4 row-span-2 grid grid-cols-subgrid col-span-4 gap-2">
      <Card className="col-span-4 h-[320px] shadow-xl row-span-2" isBlurred isFooterBlurred={false}>
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-small text-white/60 uppercase font-bold">Dołącz do nas</p>
          <h4 className="text-white font-medium text-xl">Zostań członkiem Stowarzyszenia</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="/images/plug_join_us.jpg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
          </div>
          <Button radius="full" color="primary" size="sm" as={NextLink} href="/join" >Przejdź do fotmularza</Button>

        </CardFooter>
      </Card>

        <Card className="bg-gradient-to-tr from-amber-500 to-pink-500 aspect-square m-auto w-full"
          isPressable onPress={() => { openInNewTab('https://www.instagram.com/plug.group.official/') }}>
          <CardBody>
            <FontAwesomeIcon icon={faInstagram} className="text-white fa-3x m-auto " />
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-tr from-cyan-500 to-blue-500 aspect-square m-auto w-full"
          isPressable onPress={() => { openInNewTab('https://twitter.com/plugPL') }}>
          <CardBody>
            <FontAwesomeIcon icon={faXTwitter} className="text-white fa-3x m-auto" />
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-tr from-red-700 to-red-500 aspect-square m-auto w-full"
          isPressable onPress={() => { openInNewTab('https://www.youtube.com/@polishleatheruniformgroup') }}>
          <CardBody>
            <FontAwesomeIcon icon={faYoutube} className="text-white fa-3x m-auto" />
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-tr from-sky-600 to-blue-800 aspect-square m-auto w-full"
          isPressable onPress={() => { openInNewTab('https://www.facebook.com/groups/plug.group') }}>
          <CardBody>
            <FontAwesomeIcon icon={faFacebook} className="text-white fa-3x m-auto" />
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-lime-400 to-lime-600 aspect-square m-auto w-full"
          isPressable onPress={() => { openInNewTab('https://chat.whatsapp.com/G5tB5UlmyfUK9fptMDabf3') }}>
          <CardBody>
            <FontAwesomeIcon icon={faWhatsapp} className="text-white fa-3x m-auto" />
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-b  from-indigo-500 to-indigo-700 aspect-square m-auto w-full"
          isPressable onPress={() => { openInNewTab('https://discord.gg/Pay6cXcj') }}>
          <CardBody>
            <FontAwesomeIcon icon={faDiscord} className="text-white fa-3x m-auto" />
          </CardBody>
        </Card>
    
    </div>
  </div>
  );
}
