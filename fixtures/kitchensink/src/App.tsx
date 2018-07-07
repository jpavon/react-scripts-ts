/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import FileEnvVariables from 'features/env/FileEnvVariables';

import CssInclusion from 'features/webpack/CssInclusion';
import CssModulesInclusion from 'features/webpack/CssModulesInclusion';
import ImageInclusion from 'features/webpack/ImageInclusion';
import JsonInclusion from 'features/webpack/JsonInclusion';
import LinkedModules from 'features/webpack/LinkedModules';
import SassInclusion from 'features/webpack/SassInclusion';
import SassModulesInclusion from 'features/webpack/SassModulesInclusion';
import ScssInclusion from 'features/webpack/ScssInclusion';
import ScssModulesInclusion from 'features/webpack/ScssModulesInclusion';
import SvgComponent from 'features/webpack/SvgComponent';
import SvgInCss from 'features/webpack/SvgInCss';

import JsxInclusion from 'features/webpack/JsxInclusion';
import TsxInclusion from 'features/webpack/TsxInclusion';
import TsInclusion from 'features/webpack/TsInclusion';

export const Test = () => (
  <div>
    <FileEnvVariables />

    <CssInclusion />
    <CssModulesInclusion />
    <ImageInclusion />
    <JsonInclusion />
    <LinkedModules />
    <SassInclusion />
    <SassModulesInclusion />
    <ScssInclusion />
    <ScssModulesInclusion />
    <SvgComponent />
    <SvgInCss />

    <JsxInclusion />
    <TsxInclusion />
    {TsInclusion()}
  </div>
);
