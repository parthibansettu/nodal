import { getMaxListeners } from "cluster";


class FakerMethods {
    
    /**
     * Method to generate a random string based on the length given.
     * @param {Integer} length - length of the string
     */
    randomString(length) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      
        for (let i = 0; i < length; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }

    /**
     * Method to generate a random number based on the length given.
     * @param {Integer} length - length of the string
     */
    randomNumber(length) {
        let num = "";
        let possible = "0123456789";
      
        for (let i = 0; i < length; i++)
          num += possible.charAt(Math.floor(Math.random() * possible.length));
        return num;
      }

    // Method to generate fake mail id.
    randomMail() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
      for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      text+= '@test.com'
      return text;
    }
}
export default new FakerMethods()