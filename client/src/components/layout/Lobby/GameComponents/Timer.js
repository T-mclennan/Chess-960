class Timer extends Component {
    constructor(props) {
      super(props)
      // here, getTimeRemaining is a helper function that returns an 
      // object with { total, seconds, minutes, hours, days }
      this.state = { timeLeft: getTimeRemaining(props.expiresAt) }
    }
  
    // Wait until the component has mounted to start the animation frame
    componentDidMount() {
      this.start()
    }
  
    // Clean up by cancelling any animation frame previously scheduled
    componentWillUnmount() {
      this.stop()
    }
  
    start = () => {
      this.frameId = requestAnimationFrame(this.tick)
    }
  
    tick = () => {
      const timeLeft = getTimeRemaining(this.props.expiresAt)
      if (timeLeft.total <= 0) {
        this.stop()
        // ...any other actions to do on expiration
      } else {
        this.setState(
          { timeLeft },
          () => this.frameId = requestAnimationFrame(this.tick)
        )
      }
    }
  
    stop = () => {
      cancelAnimationFrame(this.frameId)
    }
  
    render() {...}
  }