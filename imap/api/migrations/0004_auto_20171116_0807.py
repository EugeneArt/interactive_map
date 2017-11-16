# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-16 08:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_map_start_coordinate'),
    ]

    operations = [
        migrations.CreateModel(
            name='Terminal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coordinate', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.Coordinate')),
            ],
        ),
        migrations.AddField(
            model_name='floor',
            name='terminal',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Terminal'),
        ),
    ]
