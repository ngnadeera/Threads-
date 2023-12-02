"use client"

interface Props {
    user : {
        id: string;
        objectId: string;
        usernames: string;
        name: string;
        bio: string;
        image: string;
    }

    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle} : Props) =>   {

    return(
        <div>
            Account Profile
        </div>
    )

}

export default AccountProfile;