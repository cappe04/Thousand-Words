import NavBar from "./containers/NavBar";
import FlashcardOptions from "./containers/FlashcardOptions";

import HeaderIconButton from "./widgets/HeaderIconButton";

import LearnWords from "./tabs/LearnWords";
import PracticeWords from "./tabs/PracticeWords";
import WordList from "./tabs/WordList";

import TableList from "./menu/TableList"
import LangList from "./menu/LangList";

const common = {
    HeaderIconButton,
}

const menu = {
    TableList,
    LangList,
}

export {
    NavBar,
    FlashcardOptions,

    HeaderIconButton,

    LearnWords,
    PracticeWords,
    WordList, 
    
    common,
    menu,
}