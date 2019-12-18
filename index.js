/**
 * Mimeocode
 *   A tool to create starter kits for different projects.
 */


const help    = require( './inc/help.js' ),
      repos   = require( './inc/repos.js' ),
      fs      = require( 'fs-extra' ),
      spawn   = require( 'child_process' ).spawn,
      nodegit = require( 'nodegit' );


const mimeocode = {

  init: function() {
    // Save the any additional arguments to the object.
    this.args = process.argv.slice(2);

    // Display the help message and exit, if necessary.
    if ( help.isRequired( this.args ) ) {
      help.display();
    }

    // Otherwise, create the project!
    this.getRepo();
    this.getDestination();
    this.clone();
  },


  // Function to get the repo based on the passed-in project, which is the first
  // command argument.
  getRepo: function() {
    this.project = this.args[0];
    this.repo = repos.getUrl( this.project ) || this.exit( 'ERROR: Project "' + this.project + '" not found.' );
  },


  // Function to get the destination where the repo should be cloned, which is
  // the second command argument.
  getDestination: function() {
    this.destination = ( this.args[1] ) ? this.args[1] : './' + this.project;
  },


  // Function to clone the appropriate repo.
  clone: function() {
    console.log( 'Cloning "' + this.project + '" at ' + this.repo );

    nodegit.Clone( this.repo, this.destination, {} ).then( ( repo ) => {
      console.log( 'Project was successfully cloned to ' + this.destination );
      this.cleanup();
      this.build();

    } ).catch( ( error ) => {
      this.exit( error );
    } );
  },


  // Function to clean up the cloned repo so it is not associated with the repo
  // it was cloned from. This is because we are starting a *new* project and do
  // not want to overwrite the template repo with any specific project changes.
  cleanup: function() {
    fs.remove( this.destination + '/.git' ).then( () => {} ).catch( ( error ) => {
      this.exit( error );
    } );
  },


  // Function to build the cloned repo.
  //   This first checks to make sure the repo has a package.json file and a
  //   gulp file. If so, the project will be built. If not, nothing happens.
  build: function() {
    // fs.pathExists( this.destination + '/package.json' ).then( ( exists ) => {
    //   if ( exists ) {
    //     console.log( 'yes!' );
    //   }
    // } );
    // 
    // const bash = spawn( '/bin/sh', [ '-c', `
    //   cd ${ this.destination }
    //   ls
    // ` ] );
  },


  // Exit function that displays a particular error message.
  exit: function( msg ) {
    console.log( msg );
    process.exit( 1 );
  }

};


mimeocode.init();
