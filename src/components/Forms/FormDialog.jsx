import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextInput from './TextInput';

// 色々状態をもたせたいのでクラスコンポーネントで
export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            description: ''
        }

        this.inputName = this.inputName.bind(this)
        this.inputEmail = this.inputEmail.bind(this)
        this.inputDescription = this.inputDescription.bind(this)
    }

    inputName = (event) => {
      this.setState({ name: event.target.value })
    }
    
    inputEmail = (event) => {
      this.setState({ email: event.target.value })
    }

    inputDescription = (event) => {
      this.setState({ description: event.target.value })
    }

    submitForm = () => {
      const name = this.state.name,
            email = this.state.email,
            description = this.state.description,

            payload = {
              // 改行コードの種類 今回はLF(Line Feed) macOS X以降
              text: 'お問い合わせがありました。\n' + 
                    'お名前: ' + name + '\n' +
                    'Email: ' + email + '\n' +
                    '問い合わせ内容:\n' + description
            },

            url = 'https://hooks.slack.com/services/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';

            fetch(url, {
              method: 'POST',
              body: JSON.stringify(payload)
            }).then(() => {
              alert('送信が完了しました。追ってご連絡いたします！')
              // 入力内容リセットする
              this.setState({
                name: '',
                email: '',
                description: ''
              })
              return this.props.handleClose()
            })
    }

    render() {
      return(
        <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"お問い合わせフォーム"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextInput
              label={'お名前（必須）'} multiline={false} rows={1} 
              value={this.state.name} type={'text'} onChange={this.inputName}
            />
            <TextInput
              label={'メールアドレス（必須）'} multiline={false} rows={1} 
              value={this.state.email} type={'email'} onChange={this.inputEmail}
            />
            <TextInput
              label={'お問合せ内容（必須）'} multiline={false} rows={1} 
              value={this.state.description} type={'text'} onChange={this.inputDescription}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose}>
            キャンセル
          </Button>
          <Button onClick={this.submitForm} autoFocus>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
      )
    }
}