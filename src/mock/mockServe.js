import Mock from 'mockjs'
import banner from './banner.json'
import floor from "./floor.json";

Mock.mock('/mock/banner.json', {code:200,data:banner})
Mock.mock('/mock/floor.json', {code:200,data:floor})