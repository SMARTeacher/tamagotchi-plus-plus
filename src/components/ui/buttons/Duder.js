// import React, { Component } from 'react';
// import { useDrag } from 'react-dnd';

// /**
//  * Implements the drag source contract.
//  */
// const cardSource = {
//   beginDrag(props) {
//     return {
//       text: props.text
//     };
//   }
// };

// /**
//  * Specifies the props to inject into your component.
//  */
// function collect(connect, monitor) {
//   return {
//     connectDragSource: connect.useDrag(),
//     isDragging: monitor.isDragging()
//   };
// }

// class Duder extends Component {
//   render() {
//     const { isDragging, connectDragSource, src } = this.props;
//     return connectDragSource(
//       <img
//         src={src}
//         height={50}
//         width={50}
//         style={{ margin: '0 5px', cursor: 'pointer', opacity: isDragging ? 0 : 1 }}
//       />
//     );
//   }
// }

// // Export the wrapped component:
// export default useDrag('duder', cardSource, collect)(Duder);
