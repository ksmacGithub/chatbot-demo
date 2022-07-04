import React from 'react';
import './assets/styles/style.css'
import {AnswersList, Chats} from './components/index';
import FormDialog from './components/Forms/FormDialog';
import {db} from './firebase/index'
import { collection, getDocs } from 'firebase/firestore/lite';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init', 
      dataset: {},
      open: false
    }
    // クラスコンポーネントで関数を使うときはバインドが必要
    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case (nextQuestionId === 'init'):
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
        
      case (nextQuestionId === 'contact'):
        this.handleClickOpen();
        break;
      
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.rel = 'noopener nofollow';
        a.click();
        break;

      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: 'answer'
        })

        this.setState({
          chats: chats
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
    }
  }

handleClickOpen = () => {
  this.setState({ open: true });
};

handleClose = () => {
  this.setState({ open: false });
};

initDataset = (dataset) => {
  this.setState({dataset: dataset})
};

  // コンポーネントが初期化して最初のレンダーが終わった後に副作用の処理
  // データがない状態でアプリが動き出さないようにするため非同期処理
  // Get a list of questions from your database
  componentDidMount() {
    (async() => {
      const dataset = this.state.dataset,
            questionCol = collection(db, 'questions'),
            questionSnapshot = await getDocs(questionCol);
      questionSnapshot.forEach(doc => {
        const id = doc.id,
              data = doc.data();
        dataset[id] = data;
      });

      this.initDataset(dataset);
      const initAnswer = '';
      this.selectAnswer(initAnswer, this.state.currentId);
    })();
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }

  render() {
    return (
      <section className='c-section'>
        <div className='c-box'>
          <Chats chats={this.state.chats} />
          {/* レンダーするたびに実行されてしまうのでselectAnswerの後カッコつけないように */}
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    );
  }
}
