import { db } from '../firebase'

export const deleteItem = (collection, item) => {
    db.collection(collection).doc(item.id).delete()
  }