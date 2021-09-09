let questions = [];
let incorrect_answers = [];
let correct_answers = [];
let score = 0;

fetch("https://opentdb.com/api.php?amount=20&type=multiple")
    .then(response => {
        return response.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions.results.map((item) => {
            item.question = item.question.replace(/&quot;/g,"");
            item.question = item.question.replace(/&#039/g,"");
            item.question = item.question.replace(/&ldquo;/g,"");
            item.question = item.question.replace(/;/g,"");
            return {
                "key": item.question
            }
        })
        console.log(questions)

        incorrect_answers = loadedQuestions.results.map((item) => {
            return {
                "key": [...item.incorrect_answers].concat(item.correct_answer)
            }
        })

        correct_answers = loadedQuestions.results.map((item) => {
            return {
                "key":item.correct_answer
            }
        })
        startGame();        
    })
    .catch(error => {
        console.log(error);
    })

    function startGame() {
        var currentIndex = 0;
        var questionEl = document.getElementById("question");
        var a_text = document.getElementById("a_text");
        var b_text = document.getElementById("b_text");
        var c_text = document.getElementById("c_text");
        var d_text = document.getElementById("d_text");
        questionEl.innerText = questions[currentIndex].key;

        var ranNum = shuffle([0, 1, 2, 3]);
        a_text.innerText = incorrect_answers[currentIndex].key[ranNum[0]];
        b_text.innerText = incorrect_answers[currentIndex].key[ranNum[1]];
        c_text.innerText = incorrect_answers[currentIndex].key[ranNum[2]];
        d_text.innerText = incorrect_answers[currentIndex].key[ranNum[3]];
        console.log(correct_answers);

        var button = document.querySelector(".button-icon");
        button.addEventListener("click", function() {
            
            const rbs = document.querySelectorAll('input[name="quiz_answer"]');
            console.log(rbs);
            let selectedValue;
            
            for (const rb of rbs) {
                if (rb.checked) {
                    value = document.getElementById(`${rb.id}_text`)
                    selectedValue = value.innerText;
                    break;
                }
            }
            
            console.log(selectedValue);
            console.log(correct_answers)
            if (selectedValue === correct_answers[currentIndex].key) {
                score++;
                var scoreEl = document.getElementById("score");
                scoreEl.innerText = score;
            }
            
            currentIndex++;
            questionEl.innerText = questions[currentIndex].key;
            var ranNum = shuffle([0, 1, 2, 3]);
            a_text.innerText = incorrect_answers[currentIndex].key[ranNum[0]];
            b_text.innerText = incorrect_answers[currentIndex].key[ranNum[1]];
            c_text.innerText = incorrect_answers[currentIndex].key[ranNum[2]];
            d_text.innerText = incorrect_answers[currentIndex].key[ranNum[3]];
        })
        

    }

    function shuffle(array) {
        var i = array.length,
            j = 0,
            temp;
    
        while (i--) {
    
            j = Math.floor(Math.random() * (i+1));
    
            // swap randomly chosen element with current element
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
    
        }
    
        return array;
    }
