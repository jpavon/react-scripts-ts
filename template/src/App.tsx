import * as React from 'react';

// Import .js files
import welcomeMessage from 'welcomeMessage';
// Import .jsx files
import Welcome from 'Welcome';

// Import SVG as React Component
import LogoSvg from 'logo.svg';

// Choose your style import strategy
// Import css
import 'App.css';
// Import css modules
import fromCssModule from 'App.module.css';
// Import sass
import 'App.scss';
// Import sass modules
import fromSassModule from 'App.module.scss';
// Import less
import 'App.less';
// Import less modules
import fromLessModule from 'App.module.less';

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <LogoSvg className="App-logo" />
                    <h1 className="App-title">
                        <Welcome>{welcomeMessage()}</Welcome>
                    </h1>
                    <div>
                        <p className="sass-success">Style from Sass</p>
                        <p className="less-success">Style from Less</p>
                        <p className={fromCssModule.success}>Style from Css Modules</p>
                        <p className={fromSassModule.success}>Style from Sass Modules</p>
                        <p className={fromLessModule.success}>Style from Less Modules</p>
                    </div>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
