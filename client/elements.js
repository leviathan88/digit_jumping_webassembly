const ID = {
  LOADING: 'loading'
}

export const LoadingComponent = {
  view: () => m('div', { id: ID.LOADING }, "LOADING")
}

export function removeLoading() {
  const loading = document.getElementById(ID.LOADING)
  loading.style.display = 'none'
}

export const TitleComponent = {
  view: () => m('h1', "Welcome to where time stands still")
}



// const ResetButtonComponent = {
//   view: function(vnode) {
//     return m(
//       "div",
//       { id: "reset" },
//       m(
//         "button",
//         {
//           id: "reset-btn",
//           style: `border-color: ${vnode.attrs.color.border}`,
//           onclick: submit
//         },
//         "reset"
//       )
//     );
//   }
// };