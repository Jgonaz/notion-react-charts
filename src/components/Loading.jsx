import ReactLoading from 'react-loading'

export default function Loading () {
  return (
    <div style={{ marginTop: '3rem' }}>
      <ReactLoading type={'spin'} color='#4287f5' />
    </div>
  )
}
