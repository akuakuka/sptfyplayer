import { getAlbum, getArtist, getArtistalbums, getTokenForTesting } from "./spotifyService";

/* const itif = (condition) => condition ? it : it.skip; */
const stam1naBand = "41nB823nb3wxEI25UeGHqG"
const paranoidAlbum = "132qAo1cDiEJdA3fv4xyNK";
let access_token = ""

beforeAll(async () => {
    const response = await getTokenForTesting()
    access_token = `Bearer ${response.access_token}`
});

describe("Testing spotifyService", () => {
    /*     const testmodel: SpotifyClientCredentialsFlowResponse = {
            access_token: "AASKJFDAJKFALJKA",
            token_type: "Bearer",
            expires_in: 3500
        } */

    it("Gets client credentials flow access_token", async () => {
        const response = await getTokenForTesting()
        expect(response).hasOwnProperty("access_token")
        expect(response).hasOwnProperty("token_type")
        expect(response).hasOwnProperty("expires_in")
        /* console.log(response) */
    })

    it("Gets album with id", async () => {
        console.log(access_token)
        const response = await getAlbum(paranoidAlbum, access_token)
        expect(response.album_type).toBe("album")
        expect(response.name).toBe("Paranoid (2009 Remastered Version)")
        expect(response.id).toBe(paranoidAlbum)
    })

    it("Gets artist", async () => {

        const response = await getArtist(stam1naBand, access_token)

        expect(Array.isArray(response)).toBe(false)
        expect(response.name).toEqual("Stam1na")
        expect(response.id).toEqual(stam1naBand)
    })


    it("Gets artists albums", async () => {

        const response = await getArtistalbums(stam1naBand, access_token)

        expect(Array.isArray(response)).toBe(true)
        expect(response.filter(f => f.id === "1FuZ4LNYPyYsNbiIt8RmO2").length).toBe(1)
        expect(response.filter(f => f.id === "1FuZ4LNYPyYsNbiIt8RmO2")[0].name).toBe("Novus Ordo Mundi")
    })

    it("getFollowedArtists", async () => {
        // ClientCredentialsFlow token cannot access any user info
        // const response = await getFollowedArtists(access_token, [], null)     
    })
});

