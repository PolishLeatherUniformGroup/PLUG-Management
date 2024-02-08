import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Members(){
    return <div>
        <h1>Strefa Członkowska</h1>
    </div>
});