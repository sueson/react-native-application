import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';


export const config = {
    // This endpoint is appwrite hosted version...
    endpoint : 'https://cloud.appwrite.io/v1',
    platform : 'com.sueson.aora',
    projectId : '674d16630010ddb4963c',
    databaseId : '674d178c00066b89b1be',
    userCollectionId : '674d17b40036efc1baf3',
    videoCollectionId : '674d180000157cb7bc34',
    storageId : '674d19550019623dd76c',
}


const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;

// copied from SDK-react-native docs...
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);


// To create new user...
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if(!newAccount) throw Error;

        // To get the name of initials for avatar...
        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId : newAccount.$id,
                email,
                username,
                avatar : avatarUrl
            }
        )

        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


// Sign in...
export const signIn = async (email, password) => {
    try {
        // This for providing a user a valid email and password combination and create a new session...
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        throw new Error(error);
    }
}
    

// To get the current user ( logged in )...
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            // using this way can get exact user...
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        // because needs only one user...
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}


// To get all posts in home screen( videos )...
export const getAllPosts = async () => {
    try {
        // It gets all the user and video data...
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )

        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }
}


// To get latest posts...
export const getLatestPosts = async () => {
    try {
        // It gets all the user and video data...
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }
}


// For search-input...
export const searchPosts = async (query) => {
    try {
        // It gets all the user and video data...
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title',query)]
        )

        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }
}


// To get the posts users created for profile page...
export const getUserPosts = async (userId) => {
    try {
        // It gets all the user and video data...
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator',userId), Query.orderDesc('$createdAt')]
        )

        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }
}


// logout...
export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error) {
        throw Error(error);
    }
}


// for appwrite file uploading...
export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    try {
        if(type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId)
        }
        else if(type === 'image') {
            // for image have to pass it's width, height, gravity and quality include with the storageId and fileId....
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
        }
        else {
            throw new Error('Invalid file type');
        }

        if(!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}


// format for uploading file into appwrite database...
export const uploadFile = async (file, type) => {
    if(!file) return;

    // in this way appwrite accepts file and its type...
    const { mimeType, ...rest } = file;

    // in here renamed the type as mineType....
    const asset = { type : mimeType, ...rest };

    try {
        const uploadFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        );
        
        // have to create a file url for appwrite...
        const fileUrl = await getFilePreview(uploadFile.$id, type);

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

// To upload created files into appwrite database...
export const createVideo = async (form) => {
    try {
        // gotta upload all atonce so using Promise.all...
        // need as a url type to upload...
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])

        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title : form.title,
                thumbnail : thumbnailUrl,
                video : videoUrl,
                prompt : form.prompt,
                creator : form.userId
            }
        )

        return newPost;
    } catch (error) {
        throw new Error(error);
    }
}