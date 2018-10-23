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
            
               stage('Deploy to STAGING') {
                  dir(pwd() + '@script') {
                     sh('git checkout $ghprbSourceBranch')
                     sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/staging-puzzle-games.git $ghprbSourceBranch:master')
                  }
               }

               stage('Test on STAGING') {
                  sh('heroku run "CI=true npm test" -a staging-puzzle-games --exit-code')
               }

            // deploying from staging to master
            } else if (env.ghprbSourceBranch == 'staging') {

               stage('Deploy to MASTER') {
                  dir(pwd() + '@script') {
                     sh('git checkout staging')
                     sh('git push -f https://$HEROKU_USERNAME:$HEROKU_PASSWORD@git.heroku.com/puzzle-games.git staging:master')
                  }
               }

               stage('Test on MASTER') {
                  sh('heroku run "CI=true npm test" -a puzzle-games --exit-code')
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