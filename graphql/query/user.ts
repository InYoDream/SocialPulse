import { graphql } from "../../gql";

const verifyUserGoogleTokenQ=graphql(`
    #graphql
    query VerifyUserGoogleToken($token:String!){
        verifyGoogleToken(token:$token)
    }
`
);

export default verifyUserGoogleTokenQ