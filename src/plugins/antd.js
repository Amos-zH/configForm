import {
  Button,
  message,
  Layout,
  Menu,
  Tabs,
  Collapse,
  Form,
  Input,
  Select,
  Radio,
  Switch,
  Table,
  Divider,
  Modal,
} from 'ant-design-vue'

export default function setComp (app) {
  app.use(Button)
  app.use(message)
  app.use(Layout)
  app.use(Menu)
  app.use(Tabs)
  app.use(Collapse)
  app.use(Form)
  app.use(Input)
  app.use(Select)
  app.use(Radio)
  app.use(Switch)
  app.use(Table)
  app.use(Divider)
  app.use(Modal)
}
