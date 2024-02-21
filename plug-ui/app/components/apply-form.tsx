import { Input } from "@nextui-org/react";
import { SubmitButton } from "../common/submit-button";

export function ApplyForm() {    
    return (<article className="bg-content1 p-4 rounded-lg light:drop-shadow-sm" >
        <h2 className="font-bold text-4xl text-center mt-4 mb-6">Deklaracja Członkowska</h2>
            <p></p>
            <form method="POST" action="/api/apply">
                <div className="grid grid-cols-2 xs:grid-cols-1 gap-10 xs:gap-5">
                    <Input label="Imię" name="firstName" required size="lg" />
                    <Input label="Nazwisko" name="lastName" required size="lg" />
                    <Input label="E-mail" name="email" type="email" required size="lg" />
                    <Input label="Telefon" name="phone" type="tel" required size="lg" />
                    <Input label="Data urodzenia" name="birthdate" labelPlacement="outside-left" type="date" required size="lg" />
                </div>
                <h5 className="text-xl mt-4 mb-2 font-bold">Adres korespondencyjny</h5>
                <div className="grid grid-cols-2 gap-10">
                    <Input label="Kraj" name="country" required size="lg" />
                    <Input label="Region" name="state" size="lg" />
                    <Input label="Miejscowość" name="city" required size="lg" />
                    <Input label="Kod pocztowy" name="postalCode" required size="lg" />
                    <Input label="Ulica" name="street" required size="lg" />
                </div>
                <h5 className="text-xl mt-4 mb-2 font-bold"> Rekomnedacje</h5>
                <p className="bg-warning-100 border-radius-lg p-6 w-3/4 mx-auto my-2 text-warning-800">
                    Dla bezpieczeństwa członków naszego Stowarzyszenia, osoby wnioskujące o
                    członkostwo muszą uzyskać rekomendację dwóch obecnych członków Stowarzyszenia.
                    Rekomendację najłatwiej zdobyć przy okazji bezpośredniej rozmowy w trakcie imprez
                    organizowanych przez Stowarzyszenie.<br />
                    Należy podać numer karty członkowskiej osób rekomendujących w formacie: <code>PLUG-0000</code>.
                </p>
                <div className="grid grid-cols-2 gap-10">
                    <Input label="Numer Karty" name="card1" required />
                    <Input label="Numer Karty" name="card2" required />
                </div>
                <div className="p-4 m-6">
                    <SubmitButton text={"Wyślij"} color="primary" size="lg"  />
                </div>
            </form>
    </article>)
}