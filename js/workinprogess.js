// Addition to the piece object for forced capture, double jumps and kings 


// this.jumpAvailable = false;
// this.allowedToMove = true;
// this.king = false;
// this.makeKing = function () {
//   this.king = true;
// };



//   this.checkAvailableJumps = function() { // Sets pieces jumpAvailable value to true if there is a jump
//   if(this.player === 1) {
//     let downRight = board[row + 1][col + 1];
//     let downLeft = board[row + 1][col - 1];
//     if(downRight) {
//       if(downRight.player === -1 && board[row + 2][col + 2] === null) {
//         this.jumpAvailable = true;
//         return;
//       } else {
//         this.jumpAvailable = false;
//       };
//     };
//     if(downLeft) {
//       if(downLeft.player === -1 && board[row + 2][col - 2] === null) {
//         this.jumpAvailable = true;
//         return;
//       } else {
//         this.jumpAvailable = false;
//       };
//     };
//   };
//   if(this.player === -1) {
//     let upRight = board[row - 1][col + 1];
//     let upLeft = board[row - 1][col - 1];
//     if(upRight) {
//       if(upRight.player === 1 && board[row - 2][col + 2] === null) {
//         this.jumpAvailable = true;
//         return;
//       } else {
//         this.jumpAvailable = false;
//       };
//     };
//     if(upLeft) {
//       if(upLeft.player === 1 && board[row - 2][col - 2] === null) {
//         this.jumpAvailable = true;
//         return;
//       } else {
//         this.jumpAvailable = false;
//       };
//     };
//   };
// };
// this.canPieceMove = function() {
//   if(this.jumpAvailable) {
//     return;
//   } 
//   if(this.player === 1) {
//     if(board[row + 1][col + 1] === null || board[row + 1][col - 1] === null) {
//       this.allowedToMove = true;
//     } else {
//       this.allowedToMove = false;
//     };
//   };
//   if(this.player === -1) {
//     if(board[row - 1][col + 1] === null || board[row - 1][col - 1] === null) {
//       this.allowedToMove = true;
//     } else {
//       this.allowedToMove = false;
//     };
//   };
// };