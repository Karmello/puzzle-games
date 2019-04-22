node {

  ansiColor('xterm') {

    withCredentials([usernamePassword(
      credentialsId: 'HerokuCredentials',
      usernameVariable: 'HEROKU_USERNAME',
      passwordVariable: 'HEROKU_PASSWORD'
    )]) {

      try {

        // deploying from feature to staging
        if (env.ghprbSourceBranch != 'staging') {

          stage('Starting staging environment deployment') {}

          stage('Checking out a branch') {
            dir(pwd() + '@script') {
              sh('git checkout $ghprbSourceBranch')
            }
          }

          stage('Building on Heroku') {
            dir(pwd() + '@script') {
              sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/staging-puzzle-games.git $ghprbSourceBranch:master')
            }
          }

          stage('Testing') {
            sh('heroku run "CI=true npm test" -a staging-puzzle-games --exit-code')
          }

        // deploying from staging to master
        } else if (env.ghprbSourceBranch == 'staging') {

          stage('Starting production environment deployment') {}

          stage('Checking out a branch') {
            dir(pwd() + '@script') {
              sh('git checkout staging')
            }
          }

          stage('Building on Heroku') {
            dir(pwd() + '@script') {
              sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/puzzle-games.git staging:master')
            }
          }
        }

      } catch(ex) {

        throw ex

      } finally {

        stage('Cleaning up directories') {
          dir(pwd()) { deleteDir() }
          dir(pwd() + '@tmp') { deleteDir() }
          dir(pwd() + '@script') { deleteDir() }
          dir(pwd() + '@script@tmp') { deleteDir() }
        }
      }
    }
  }
}
