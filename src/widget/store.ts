import { create } from 'zustand'
import {guid} from './Tools'

const useStore = create((set,get) => ({
  votes: {"a":"b"},
  // addVotes: () => set(state => ({ votes: {...state.votes, ...{"c":"AAAA"}} })),
  // subtractVotes: () => set(state => ({ votes: {...state.votes, ...{"D":"DDDD"}} })),

  imglist: {"a":"b"},
  // addImg: (url) => set((state) => {
  //     const target = {}
  //     target[`img${guid()}`] = url
  //     // state.imglist = { ...get().imglist, ...target }
  //     return {...state.imglist, ...target}
  // }),
  addImg: (url,id) => set(state => {
    const target = {}
    target[`img${id}`] = url
    return ({ imglist: {...state.imglist, ...target} })
  }),
  removeImg: (gid:string) => set(state => {
    delete state.imglist[`${gid}`]
    return ({ imglist: {...state.imglist} })
  }),
}))

export {useStore}
