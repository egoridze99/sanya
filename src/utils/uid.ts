export default function uid(prefix = "uid") {
  return `${prefix}--${Math.random().toString(36).substr(2, 9)}`;
}
