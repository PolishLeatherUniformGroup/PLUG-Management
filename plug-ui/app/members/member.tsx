import { faMessage, faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, User } from "@nextui-org/react";

export default function Member({ name, card, status }: { name: string, card: string, status: string }) {
    return <User name={name} description={
        <div>
            <div className="text-sm">{card}</div>
            <div><Button isIconOnly><FontAwesomeIcon icon={faMessage} />
                </Button>
                <Button isIconOnly>
                <FontAwesomeIcon icon={faStar} />
                </Button>
                </div>
        </div>
    } className="border-1 border-foreground rounded-sm p-2 backgroun" />
}