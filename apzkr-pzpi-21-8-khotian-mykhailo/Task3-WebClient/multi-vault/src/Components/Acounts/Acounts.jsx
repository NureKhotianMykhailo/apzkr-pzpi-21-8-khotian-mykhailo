import React, {useState, useEffect} from 'react'
import './Acounts.css'
import Find from '../Find-Line/Find'
import Header from '../Header/MainHeader'
import Acount from '../Acount/Acount'
import axios from 'axios'
const Acounts = () => {

    const fetchUserSettings = async () => {
        try {    
            const response = await axios.get('api/user')
            return response.data.settings    
        } catch (error) {    
            console.error(error)    
        }    
    }
    const [isEnglish, setIsEnglish] = useState(null)
    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const settingsData = await fetchUserSettings()
                setIsEnglish(settingsData.isEngLanguage)
            } catch (error) {
                console.error(error);
            }
        };
        fetchWallet();
    
    }, []);
    

    const accountList = [
        {"src":"Brain.png",
        "name": isEnglish ? "Bryan Pellegrino" : "Браян Пепегіно", 
        "description": isEnglish ? "@PrimordialAA: Co-Founder and CEO of LayerZero Labs." :
         "@PrimordialAA: Співзасновник і генеральний директор LayerZero Labs.", 
        "user":"0x4f19b886C5Cc4ac9Ca32596D2bBCf760928703B8"},
        {"src":"but.png",
        "name": isEnglish ? "Vitalik Buterin" : "Віталік Бутерін", 
        "description": isEnglish ? "@VitalikButerin:  Canadian computer programmer and co-founder of Ethereum." :
         "@VitalikButerin: Канадський програміст і співзасновник Ethereum.", 
        "user":"0xD3E59dbbb83dBD606ea1A91E8E6f82968d86A88d"},
        {"src":"blackrock.png",
        "name": isEnglish ? "BlackRock" : "BlackRock", 
        "description": isEnglish ? "@BlackRock:  Global investment manager. \
         Technology provider. Helping more and more people experience financial well-being." :
         "@BlackRock: Глобальний інвестиційний менеджер. Постачальник технологій. \
          Допомога все більшій кількості людей відчути фінансове благополуччя.", 
        "user":"0xAda0fE15a97da69C1B0Dd5Aab21EfD20840f5c72"},
        {"src":"VanEck.png",
        "name": isEnglish ? "VanEck" : "VanEck", 
        "description": isEnglish ? "@vaneck_us:  Founded in ‘55, we offer investment solutions, including ETFs." :
         "@vaneck_us: Заснована в 1955 році, ми пропонуємо інвестиційні рішення, зокрема ETF. ", 
        "user":"0xa38ffe16cc95966389810970927784ca89db1085"}, 
        {"src":"Joe.png",
        "name": isEnglish ? "Joey Mueller" : "Джон Міллер", 
        "description": isEnglish ? "@TraderJoeCEO: Tired of the same old boring crypto?  I'm here to change that." :
         "@TraderJoeCEO: Втомилися від тієї самої старої нудної криптовалюти? Я тут, щоб це змінити.", 
        "user":"0xf9be8af9f649113a10529526e4c4dbe0f1f90289"},     
        {"src":"consence.png",
        "name": isEnglish ? "Consensys" : "Consensys", 
        "description": isEnglish ? "@Consensys:  A complete suite of trusted products to build anything in web3." :
         "@Consensys: Повний набір надійних продуктів для створення будь-чого в web3.", 
        "user":"0xb4c3f56e271d938b5be2c0a813fc6cabc4c2a4a5"},  
    ]   

    return (
        <div className='accounts-container'>
            <Header />
            <div className='accounts-table-container'>
                <Find placeholder = {isEnglish ? 'Find...' : 'Знайти...'} button =  {isEnglish ? 'Search' : 'Пошук'}/>
                    {Array.from({length: Math.ceil(accountList.length / 3)}, (_, i) => i).map(i => (
                    <div key={i} className='account-table'>
                    {accountList.slice(i * 3, (i + 1) * 3).map((account, index) => (
                        <Acount key={index} src={account.src} name={account.name} description={account.description} user = {account.user}/>
                    ))}
                </div>
                ))}
            </div>
        </div>
    )
   
}
export default Acounts