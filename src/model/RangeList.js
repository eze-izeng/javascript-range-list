// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
/**
*
* NOTE: Feel free to add any extra member variables/functions you like.
*/
const ranges = [];
class RangeList {

    constructor() {
        this.ranges = [];
    }

    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
    */
    add(range) {
    // TODO: implement this
        if (range[0] >= range[1]) {
            return;
        }   
        this.ranges.push(range);
        this.normalize();
    }
    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
    */
    remove(range) {
    // TODO: implement this
        this.split(range);
        for (let i = 0; i < this.ranges.length; i++) {
            let current = this.ranges[i];
            if (current[0] >= range[0] && current[1] <= range[1]) {
                this.ranges.splice(i, 1);
                i--;
            }
        }
        this.normalize();
    }
    /**
    * Prints out the string representation of the ranges in the range list
    */
    print() {
    // TODO: implement this
        console.log(this.toString());
    }
    /** 
     * 
    **/
    toString() {
        let str = ``;
        for (let range of this.ranges) {
            str += `[${range[0]}, ${range[1]}) `;
        }
        return str.substring(0, str.length - 1);
    }
    /**
    * Invoke sortRanges() function and then merge overlapping ranges
    */
    normalize() {
        this.sortRanges();
        let prev = this.ranges[0];
        for (let i = 1; i < this.ranges.length; i++) {
            let current = this.ranges[i];
            if (prev[1] >= current[0]) {
                this.ranges.splice(i - 1, 2, [prev[0], Math.max(prev[1], [current[1]])]);
                i--;
            } else {
                prev = current;
            }
        }
    }
    /**
    * Sort ranges ascendingly based on the beginning value of range
    */
    sortRanges() {
        this.ranges.sort((r1, r2) => r1[0] - r2[0]);
    }
    /**
    * Split ranges based on the given range value
    * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
    */
    split(range) {
        for (let i = 0; i < this.ranges.length; i++) {
            let current = this.ranges[i];
            //console.log(`current: ${current}`);
            //console.log(`range: ${range}`);
            if (current[0] < range[0] && current[1] > range[0]) {
                this.ranges.splice(i, 1, [current[0], range[0]], [range[0], current[1]]);
                //console.log(`check1: ${this.ranges}`);
                continue;
            }
            if (current[0] < range[1] && current[1] > range[1]) {
                this.ranges.splice(i, 1, [current[0], range[1]], [range[1], current[1]]);
                //console.log(`check2: ${this.ranges}`);
                continue;
            }
        }
    }
}

module.exports = {
    RangeList: RangeList
}
