import { loadFeature, defineFeature} from 'jest-cucumber';
import supertest from 'supertest';
import app from '../src/app';
const feature = loadFeature('tests/features/pagamentos.feature');

defineFeature(feature, test => {

});