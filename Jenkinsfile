node {
   
   ansiColor('xterm') {
      
      withCredentials([usernamePassword(
         credentialsId: 'HerokuCredentials',
         usernameVariable: 'HEROKU_USERNAME',
         passwordVariable: 'HEROKU_PASSWORD'
      )]) {

         try {

            stage('Deploy to STAGING') {
               dir(pwd() + '@script') {
                  sh('git checkout $ghprbSourceBranch')
                  sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/staging-puzzle-games.git $ghprbSourceBranch:master')
               }
            }

            stage('Test on STAGING') {
               sh('heroku run "CI=true npm test" -a staging-puzzle-games')
            }

            if (env.ghprbSourceBranch == 'staging') {
               stage('Deploy to MASTER') {
                  dir(pwd() + '@script') {
                     sh('git checkout staging')
                     sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/puzzle-games.git staging:master')
                  }
               }
            }
      
         } catch(ex) {

            throw ex

         } finally {

            stage('Clean up') {
               dir(pwd()) { deleteDir() }
               dir(pwd() + '@tmp') { deleteDir() }
               dir(pwd() + '@script') { deleteDir() }
               dir(pwd() + '@script@tmp') { deleteDir() }
            }
         }
      }
   }
}