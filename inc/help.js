/**
 * Mimeocode help.
 */

module.exports = {

  // Function to determine if the user needs help.
  //   This is determined if the user either uses this module with no parameters
  //   or if the user uses this module with any common help parameter.
  isRequired: function( args ) {
    return ( args.length <= 0 || args[0] == '--h' || args[0] == '--help' || args[0] == 'help' );
  },


  // Function to create and display the help message.
  //   Once the help message is displayed, the command will exit.
  display: function() {

    // The help message, as a template literal for formatting purposes.
    const message = `
Usage: node index.js [project] [destination]

Available projects include:
  - gutenberg-block
  - gutenberg-plugin
  - static-website
    `;

    // Display the message and then exit.
    console.log( message );
    process.exit( 1 );
  }

};
