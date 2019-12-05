
  exports.getRandomInt = (max) =>{
    return Math.floor(Math.random() * Math.floor(max))+1;
  }

  //Returns the index of the nth free space in the row array:
  exports.getNthOpenPosition = (row, num) => {
    let index = 0;
    let count = 0;
    let returnValue = null;
    row.forEach((value) => {
      if (value === 0) {
        count++
        if (count === num) {
          returnValue = index;
      }}
      index ++
    })
    return returnValue;
  }

  exports.generateBoard = () => {
    //black can be white with a toUpper() function called:
    const row = [0,0,0,0,0,0,0,0]
    
    //Generates bishop placement:
    const bb = (this.getRandomInt(4)-1)*2
    row[bb+1] = 'b'
    const wb = (this.getRandomInt(4)-1)*2
    row[wb] = 'b'

    //Generates queen position:
    const qp = this.getNthOpenPosition(row, this.getRandomInt(6));
    row[qp] = 'q'
    
    //Generates position for black knight:
    let bkp = 1;
    while (bkp % 2 === 1) {
      bkp = this.getNthOpenPosition(row, this.getRandomInt(5));
    }
    row[bkp] = 'n'

    //Generates position for white knight:
    let wkp = 0;
    while (wkp % 2 === 0) {
      wkp = this.getNthOpenPosition(row, this.getRandomInt(4));
    }
    row[wkp] = 'n'

    //Generates placement of rooks and King:
    row[this.getNthOpenPosition(row, 2)] = 'k'
    row[this.getNthOpenPosition(row, 1)] = 'r'
    row[this.getNthOpenPosition(row, 1)] = 'r'

    const whiteSide = row.join('');
    const blackSide = whiteSide.toUpperCase();
    const fenString = whiteSide + '/pppppppp/8/8/8/8/PPPPPPPP/' + blackSide + ' w KQkq - 0 1'

    return fenString;
  }
// }

//   export default boardGeneration;