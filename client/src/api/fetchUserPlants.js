import { db } from '../firebase'

export const fetchUserPlants = (uid, cb) => db.collection('plants').where("user", "==", uid).onSnapshot(snapshot => 
    {
        let data = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
        cb(data)
    })