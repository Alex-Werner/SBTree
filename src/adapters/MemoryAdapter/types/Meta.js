class Meta {
  constructor(props = {}) {
    this.size = (props.size) ? props.size : 0;
    this.identifiers = (props.identifiers) ? props.identifiers : [];
  }
}
export default Meta;
