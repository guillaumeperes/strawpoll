/*class Poll extends React.Component {
  render() {
    return (

    );
  }
}*/


  var strawpoll = {
    init: function(){
      var that = this;

      /* Le listener pour l'envoie du sondage */
      document.querySelector('#btn_submit').addEventListener("click", function(){
        var question = document.getElementById("inp_question").value;
        var answersArray = Array.from(document.querySelectorAll('.inp_answer')).map(function(e){return e.value});
        var duplicationCheck = 1;
        var multipleAnswers = (document.getElementById("multipleAnswers").checked)?1:0;

        strawpoll.submitPoll(question, answersArray, duplicationCheck, multipleAnswers);
      });

      /* Le listener pour l'ajout de réponse possible */
      document.querySelector('#answers_div').addEventListener("input", function(e){
        if(e.target.className == "inp_answer" && that.utils.shouldAddChoice())that.utils.addChoiceInput();
      });


      /* Le listener pour la sauvegarde du sondage */
      document.querySelector('#btn_save').addEventListener("click", function(){
        swal("C'est bon!", "Votre sondage a été sauvegardé!", "success");
      });

    },
    getPoll: function(id){
      nanoajax.ajax({url:'https://www.guillaumeperes.com/api/poll/'+id}, function (code, responseText) {
        var poll = JSON.parse(responseText);




      });
    },
    submitPoll: function(question, answersArray, duplicationCheck, multipleAnswers){
      if(!this.utils.isPollValid()){
         /*$('#inp_question').parent().addClass("error");
         $('#inp_question').transition('shake');*/
         sweetAlert("Oops...", "Il faut entrer une question et au moins 2 réponses!", "error");
      }
      else {
        var data = {
          "duplication_check": duplicationCheck,
          //"user": 1,
          "has_captcha": false,
          "multiple_answers": multipleAnswers,
          "is_draft": false,
          "question": question,
          "answers": answersArray
        };

        nanoajax.ajax({url: 'https://strawpoll.guillaumeperes.fr/api/poll/', method: 'POST', body: JSON.stringify(data)}, function (code, responseText, request) {
            /*# code is response code
            # responseText is response body as a string
            # request is the xmlhttprequest, which has `getResponseHeader(header)` function*/
            if(code == 200){
              var res = JSON.parse(responseText);
              if(res.code == "200")swal("C'est bon!", res.message, "success");
              else sweetAlert("Oops...", res.error, "error");
            }
            else {
              sweetAlert("Oops...", "La requête n'a pas pu être envoyée!", "error");
            }
            
        })
        
      }
    },
    answerPoll: function(id, answersArray){

    },
    utils:{
      countAnswers: function(){ /* Compte le nombre de réponse entrées par l'utilisateur */
        return Array.from(document.querySelectorAll('.inp_answer')).filter(function(e){return e.value!=""}).length; 
      },
      isPollValid: function(){ /* Vérifie que la question à été entrée et qu'il y a au moins 2 réponses */
        if(document.querySelector("#inp_question").value == "" || this.countAnswers()<2)return false;
        else return true;
      },
      addChoiceInput: function(){
        var e = document.createElement('div');
        e.innerHTML = '<div class="ui fluid corner labeled input"><input class="inp_answer" type="text" placeholder="Ajoutez une réponse..."></div>';
        e.className = "field";
        document.querySelector('#answers_div').appendChild(e);
      },
      shouldAddChoice: function(){
        if(this.countAnswers() == document.getElementsByClassName('inp_answer').length)return true;
        else return false;
      }
    }
  };