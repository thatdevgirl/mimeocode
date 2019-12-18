/**
 * Mimeocode list of available projects.
 */

module.exports = {

  // Object that lists all of the available projects and repos.
  list: {
    'gutenberg-block':  'https://github.com/That-Dev-Girl-Boilerplates/gutenberg-block-base.git',
    'gutenberg-plugin': 'https://github.com/That-Dev-Girl-Boilerplates/gutenberg-plugin-base.git',
    'static-website':   'https://github.com/That-Dev-Girl-Boilerplates/static-website-base.git'
  },


  // Function to get the repo URL based on the passed-in project.
  getUrl: function( project ) {
    const allProjects = Object.keys( this.list );

    if ( allProjects.includes( project ) ) {
      return this.list[project];
    }

    return false;
  }

};
