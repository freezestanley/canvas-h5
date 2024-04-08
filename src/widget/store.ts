import { create } from 'zustand'

const useBearStore = create((set) => ({
  imglist: {},
  addImg: (url) => set((state) => {
    const target = {}
    target[`img${new Date().getTime()}`] = url
    return target
  }),
  removeImg: (id) => set((state) => {
    delete state.imglist[id]
    return state.imglist
  }),
}))

export {useBearStore}
