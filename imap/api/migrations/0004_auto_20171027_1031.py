# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-27 10:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_map_path_to_graph'),
    ]

    operations = [
        migrations.AlterField(
            model_name='building',
            name='scheme',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tracks', to='api.Scheme'),
        ),
    ]