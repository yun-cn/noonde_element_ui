import moment from 'moment'
import twix from 'twix'

export default {
  pre (text) {
    if (!text) return
    return text.split('\n').join('<br/>')
  },

  date (detail) {
    return moment(detail.detail_at).format('YYYY.MM.DD')
  }
}
