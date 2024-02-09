'use client'
import { Card, CardBody, Input, Textarea } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faXTwitter, faYoutube, faFacebook, faWhatsapp, faDiscord } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { RedirectType, redirect } from "next/navigation";
import { SubmitButton } from "@/app/components/submit-bottom";

export default function AssociationContact() {
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    return <div>

        <div className="w-2/3 mx-auto p-4 mb-2">
            <h1 className="font-extrabold text-7xl text-default-600">Więcej informacji o naszym <span className="text-primary">Stowarzyszeniu</span> oraz naszych inicjatywach znajdziesz
                na naszych kanałach social media. </h1>
        </div>


        <div className="grid grid-cols-6 xs:grid-cols-3 gap-6 xs:gap-3 my-4 w-1/2 mx-auto">
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
        <div className="bg-content1 rounded-lg drop-shadow-sm w-2/3  mx-auto mt-2 p-4 grid grid-cols-9">
            <div className="col-span-6">
                <h3 className="text-2xl font-medium p-4">Napisz do nas</h3>
                <form className="grid grid-cols-3 gap-2 px-2 pr-4">
                    <Input type="email" name="from" label="Twój email" required  className="col-span-3"/>
                    <Input type="text" name="subject" label="Temat" required className="col-span-3"/>
                    <Textarea name="messsge" label="Wiadomość" required className="col-span-3" minRows={5} maxRows={12} />
                    <SubmitButton  size="md" color="primary" text="Wyślij" />
                </form>
            </div>
            <div className="col-span-3">
                <Image src="/images/contact_us.jpg" className="rounded-lg" />
            </div>
        </div>
    </div>
}